require('normalize.css/normalize.css');
require('styles/App.scss');


import ReactDOM from 'react-dom';


// import React from 'react';
// import ReactDOM from 'react-dom';

//获取图片相关的数据
let imageDatas = require('json!../data/imageDatas.json');

import React from 'react';

// 利用自调用匿名函数获取图片信息。

// getRangeRandom()函数: 获取区间内一个随机值T。
// Math.random()生成0到1的数，乘几再floor就是0到几的整数。
var getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);

var get30DegRandom = () =>{
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}
imageDatas = ( (imageDatasArr) => {
	for (var i = 0,j = imageDatasArr.length;i < j; i++){

		var singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);

		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);


class ImgFigure extends React.Component {
	render() {

		var styleObj = {};
		if (this.props.arrange.pos) {
			styleObj =  this.props.arrange.pos;
		}
		if (this.props.arrange.rotate) {
			(['Moz', 'Ms', 'Webkit', '']).forEach((value) => {
				styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			})
		}

		if (this.props.arrange.isCenter) {
			styleObj.zIndex = 11;
		}
		var imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse ' : '';
		// figure标签用作文档中插图的图像

		//props是什么？

		//props指的是组件上的属性。是一种父级向子级传递数据的方式。

		//在这里，定义了ImgFigure组件，在使用ImgFigure组件时，在其上定义data属性。（见GalleryByReactApp组件的render）

		//而data是一个json对象，我们取到data.imageURL，设置为图片的URL属性。
		return(
				<figure className={imgFigureClassName}  style = {styleObj}
				onClick = {(e) =>{
    				//翻转和居中图片
    				if (this.props.arrange.isCenter) {
    					this.props.inverse();
    				}
					else {
						this.props.center();
					}
					e.stopPropagation();
					e.preventDefault();}}>
					<img src={this.props.data.imageURL} alt={this.props.data.title}/>
					<figcaption>
						<h2 className="img-title">{this.props.data.title}</h2>
					</figcaption>
				</figure>
			);
	}
}

// 控制组件
class ControllerUnit extends React.Component {
	constructor(props) {
		super(props);

		// 要把this绑定到handleClick()函数上
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		e.preventDefault();
		e.stopPropagation();

		if (this.props.arrange.isCenter) {
			this.props.inverse();
		}
		else {
			this.props.center();
		}
	}

	render() {

		var controllerUnitClassName = 'controller-unit';
		//如果对应的是居中的图片，显示控制按钮的居中态

		if (this.props.arrange.isCenter) {
			controllerUnitClassName += ' is-center ';
			//如果翻转显示翻转状态
			if (this.props.arrange.isInverse) {
				controllerUnitClassName += 'is-inverse'
			}
		}
		return (
      		<span className={ controllerUnitClassName } onClick={this.handleClick}></span>
    	)
	}
}
class GalleryByReactApp extends React.Component {

	// constructor 为ES6中使用class定义类的构造方法，在其中传递的this就是指的实例对象。
	// ES6中，class定义类，其实例的属性写在constructor里，其方法直接写在类里。

	// 使用React.Component创建组件，需要通过在constructor中调用super()将props传递给React.Component。另外react 0.13之后props必须是不可变的。
	constructor(props) {
		super(props);
		// 在子类constructor中，super代表父类的constructor.bind(this)。是个函数。
		// 此处相当于React.Component的props传递进入GalleryByReactApp子组件。成为一个属性。

		this.Constant = {
			centerPos : {
				left : 0,
				right : 0
			},
			hPosRange : {
				leftSecX : [0,0],
				rightSecX : [0,0],
				y : [0,0]
			},
			vPosRange : {
				x : [0,0],
				topY : [0,0]
			}
		};

		this.state = {
			imgsArrangeArr: [
				// {
				// 	pos : {
				// 		left : '0',
				// 		top : '0'
				// 	}
				// }
			]
		};
	}

	


	// rearrange()函数: 重新布局所有图片



	rearrange(centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),    // 取一个或者不取
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate: 0,
          isCenter: true
        };

        // 取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
              pos: {
                  top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                  left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
              },
              rotate: get30DegRandom(),
              isCenter: false
            };
        });

        // 布局左右两侧的图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;

            // 前半部分布局左边， 右半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
              pos: {
                  top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                  left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
              },
              rotate: get30DegRandom(),
              isCenter: false
            };

        }
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
  }

	// getInitialState()函数: 定义图片初始位置信息
	// getInitialState () {
	// 	return {
	// 		imgsArrangeArr: [
	// 			{
	// 				pos : {
	// 					left : '0',
	// 					top : '0'
	// 				}
	// 			}
	// 		]
	// 	}
	// }

	// 使用ES6的class写法的React组件，直接在constructor中书写 this.state属性，不必再调用getInitialState()函数。


// componentDidMount()函数是React封装的一个函数，在组件渲染完成 已经出现在dom文档里的时候调用，这与组件的生命周期有关。

	inverse(index) {
		return () => {
			var imgsArrangeArr = this.state.imgsArrangeArr;

			//取反

			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

			this.setState({
				imgsArrangeArr : imgsArrangeArr
			});
		}
	}
	center(index) {
		return () => {
			this.rearrange(index);
		}
	}

	componentDidMount () {
		// 组件加载以后，为每张图片计算其位置的范围。

		// ref是什么？

		// ref是指在定义组件类的时候，render的返回值中的某个虚拟DOM节点，在其上定义ref属性，即可索引到该虚拟DOM

		// 高版本的react已经不需要findDOMNode()方法了

		// 拿到舞台的大小，因此我们给舞台添加ref为stage

		var stageDOM = ReactDOM.findDOMNode(this.refs.stage);


		// scrollWidth：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。
		// clientWidth：对象内容的可视区的宽度，不包滚动条等边线，会随对象显示大小的变化而改变。
		// offsetWidth：对象整体的实际宽度，包滚动条等边线，会随对象显示大小的变化而改变。

		var stageW = stageDOM.scrollWidth,stageH = stageDOM.scrollHeight;
		// Math.ceil取整

		var halfStageW = Math.ceil(stageW / 2),halfStageH = Math.ceil(stageH / 2);
		// 拿到一个imageFigure的大小,因此我们给ImgFigures的每一项添加ref，分别关联数组key值。

		// 使用findDOMNode()方法获取真实的DOM节点。

		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.ImgFigure0);

		var imgW = imgFigureDOM.scrollWidth,imgH = imgFigureDOM.scrollHeight;
		var halfImgW = Math.ceil(imgW / 2),halfImgH = Math.ceil(imgH / 2);

		//计算中心图片的位置点,需要在组件渲染完成之后才能计算，因此写在componentDidMount()中。

		this.Constant.centerPos = {
			left : halfStageW - halfImgW,
			top : halfStageH - halfImgH
		}

		// 计算左侧，右侧区域图片排布位置的取值范围，见附图

		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
	    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

	    this.Constant.hPosRange.y[0] = -halfImgH;
	    this.Constant.hPosRange.y[1] = stageH - halfImgH;
	    //计算上测区域图片排布的取值范围，见附图
	    this.Constant.vPosRange.topY[0] = -halfImgH;
	    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

	    this.Constant.vPosRange.x[0] = halfStageW - imgW;
	    this.Constant.vPosRange.x[1] = halfStageW;

	    var num = Math.floor(Math.random() * 10);

	    // num是1到10的整数

    	this.rearrange(num);
	}
	  render() {
	  	// section标签定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。

	  	var controllerUnits = [];
	  	var ImgFigures = [];

	  	imageDatas.forEach((value,index) => {
	  		//定义了ImgFigure的data属性。
	  	if (!this.state.imgsArrangeArr[index]) {
	  			this.state.imgsArrangeArr[index] = {
	  				pos : {
	  					left : '0',
	  					top : '0'
	  				},
	  				rotate : 0,
	  				isInverse : false,
	  				isCenter : false
	  		}
	  	}
	  		ImgFigures.push(<ImgFigure data={value} ref={'ImgFigure' + index} key={index}
	  						arrange = {this.state.imgsArrangeArr[index]}
	  						inverse={this.inverse(index)} center={this.center(index)}
	  						/>);
	  		controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]}
                                           inverse={this.inverse(index)}
                                           center={this.center(index)}/>);

	  	});
	    return (
	      <section className="stage" ref="stage">
	        <section className="img-sec">
	        	{ImgFigures}
	        </section>
	        <nav className="controller-nav">
	        	{controllerUnits}
	        </nav>
	      </section>
	    );
	  }
	}

GalleryByReactApp.defaultProps = {
};

export default GalleryByReactApp;
