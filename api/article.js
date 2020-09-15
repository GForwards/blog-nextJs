/* 文章类 */
import request from '@/utils/request';

/**
 * 获取文章详情
 * @export 
 * @param {*} 
 * @returns
 */
export function getArticleDetail(id) {
  return request({
    url: `/get/article/detail/${id}`,
    method: 'get',
  });
}

/**
 * 获取文章详情 
 * @export 
 * @param {*} 
 * @returns
 */
export function getArticleList() {
  return request({
    url: `/get/article/list`,
    method: 'get',
  });
}