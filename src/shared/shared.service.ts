import * as fs from 'fs-extra';
import * as path from 'path';
import * as url from 'url';

import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as qiniu from 'qiniu';

@Injectable()
export class SharedService {
  rootDir: string = path.resolve(__dirname, '../../');

  /**
   * 先创建文件和目录(不存在会自动创建)，再写入数据
   * @param path
   * @param data
   */
  private async _writeFile(path: string, data: any) {
    await fs.ensureFile(path);
    await fs.writeFile(path, data);
  }

  /**
   * 将文件保存到public目录下
   *
   * ```
   * const ppath = savePublicFile(file); // http://localhost:3000/<ppath>
   * const ppath = savePublicFile(file, 'images'); // http://localhost:3000/images/<ppath>
   * ```
   * @param file
   */
  async savePublicFile(
    file: Express.Multer.File,
    dirPath: string = '',
  ): Promise<string> {
    try {
      const filename = `${Date.now()}-` + file.originalname;
      const savePath = path.join(process.env.public_path, dirPath, filename);
      await this._writeFile(path.join(this.rootDir, savePath), file.buffer);
      return new url.URL(savePath, 'http://x').pathname; // file paht to url path
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('上传文件失败，服务器错误!');
    }
  }

  async qiniu(file: Express.Multer.File): Promise<string> {
    // get token
    const mac = new qiniu.auth.digest.Mac(process.env.qn_ak, process.env.qn_sk);
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: process.env.qn_scope,
    });
    const uploadToken = putPolicy.uploadToken(mac);

    // upload to qiniu
    const formUploader = new qiniu.form_up.FormUploader(
      new qiniu.conf.Config({
        zone: qiniu.zone.Zone_z2, // 华南
      }),
    );

    return new Promise((_res, _rej) => {
      formUploader.put(
        uploadToken,
        `${Date.now()}-${file.originalname}`,
        file.buffer,
        new qiniu.form_up.PutExtra(),
        function (respErr, respBody, respInfo) {
          if (respErr) {
            console.error(respErr);
            throw new InternalServerErrorException(respErr.message);
          }

          if (respInfo.statusCode == 200) {
            _res(new url.URL(respBody.key, process.env.qn_host).href);
          } else {
            console.error(respInfo.statusCode);
            console.error(respBody);

            throw new InternalServerErrorException('上传文件失败');
          }
        },
      );
    });
  }
}
