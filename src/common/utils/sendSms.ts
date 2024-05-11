import * as tencentcloud from 'tencentcloud-sdk-nodejs';
import { getConfig } from './configLoader';

// 导入对应产品模块的client models。
const smsClient = tencentcloud.sms.v20210111.Client;

const { TENCENT_CLOUD_CONFIG } = getConfig();

const clientConfig = {
  credential: {
    //腾讯云认证信息
    secretId: TENCENT_CLOUD_CONFIG.secretId,
    secretKey: TENCENT_CLOUD_CONFIG.secretKey,
  },
  region: 'ap-guangzhou',
  profile: {
    httpProfile: {
      endpoint: 'sms.tencentcloudapi.com',
    },
  },
};
const client = new smsClient(clientConfig);

export const sendCode = async (phoneNumberSet, code, timeout) => {
  //发送短信参数
  const params = {
    PhoneNumberSet: phoneNumberSet,
    //填入SDK的APPID
    SmsSdkAppId: '1400631433',
    //填入模板ID
    TemplateId: '2151961',
    //签名
    SignName: 'Julien的小窝',
    //填入参数
    TemplateParamSet: [code, timeout],
  };
  client
    .SendSms(params)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
