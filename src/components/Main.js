require('normalize.css/normalize.css');
require('styles/App.scss');

// import React from 'react';
// import ReactDOM from 'react-dom';

//获取图片相关的数据
let imageDatas = require('json!../data/imageDatas.json');

import React from 'react';

// 利用自调用匿名函数获取图片信息。

imageDatas = (function genImageURL(imageDatasArr) {
	for (var i = 0,j = imageDatasArr.length;i < j; i++){

		var singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);

		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);

//console.log(imageDatas);


class GalleryByReactApp extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }
}

GalleryByReactApp.defaultProps = {
};

export default GalleryByReactApp;
