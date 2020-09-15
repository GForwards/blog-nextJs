/* 标签类 */
import request from '@/utils/request';

/**
 * 获取列表
 * @export 
 * @param {*} 
 * @returns
 */
export function getTypes() {
  return request({
    url: `/get/type`,
    method: 'get',
  });
}
 