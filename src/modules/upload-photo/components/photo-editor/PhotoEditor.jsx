import React from "react";
import ReactDOM from 'react-dom';
import { Brush } from '@material-ui/icons';

export default class PhotoEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    photo: null,
    modal: null,
    grayscale: 0,
    blur: 0,
    brightness: 100,
    contrast: 100,
    hueRotate: 0,
    invert: 0,
    saturate: 100,
    sepia: 0,
    rotate: 0,
    canvas: null,
    context: null,
    drawSize: 3,
    colorDraw: "#ff0000",
    drawTool: "draw",
    imageObj: null,
    canvasWidth: 450,
    canvasHeight: 450
  };
  this.drawCanvas = null;
  this.drawContext = null;
}

  componentDidUpdate() {
    //Canvas
    let canvas = ReactDOM.findDOMNode(this._colorCanvas);
    let context = canvas.getContext("2d");
    let imageObj = new Image();
    imageObj.src = `${this.state.photo}`;
    imageObj.onload = () => {
      context.drawImage(
        imageObj,
        0,
        0,
        this.state.canvasWidth,
        this.state.canvasHeight
      );
    };

    //Draw 
    let drawCanvas = ReactDOM.findDOMNode(this._drawCanvas);
    let drawContext = drawCanvas.getContext("2d");
    this.draw(drawCanvas, drawContext);

    //Filters
    context.filter = `grayscale(${this.state.grayscale}%) 
      blur(${this.state.blur}px)
      brightness(${this.state.brightness}%)
      contrast(${this.state.contrast}%)
      hue-rotate(${this.state.hueRotate}deg)
      invert(${this.state.invert}%)
      saturate(${this.state.saturate}%)
      sepia(${this.state.sepia}%)`;
    context.drawImage(
      imageObj,
      0,
      0,
      this.state.canvasWidth,
      this.state.canvasHeight
    );
    this.drawCanvas = drawCanvas;
    this.drawContext = drawContext;
  }

  componentDidMount() {
    //Modal
    let modal = ReactDOM.findDOMNode(this._modal)
    let btn = ReactDOM.findDOMNode(this._modalBtn)
    let close = ReactDOM.findDOMNode(this._close)

    btn.onclick = () => {
      modal.style.display = "block";
    };
    close.onclick = () => {
      modal.style.display = "none";
    };
    window.onclick = event => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  componentWillReceiveProps(){
    this.setState({photo: this.props.photo})
  }

  render() {
    return (
      <div className="wrap">
        <Brush className="myBtn" ref={(el) => {this._modalBtn = el}}/>
        <div className="myModal" ref={(el) => {this._modal = el}} className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" ref={(el) => {this._close = el}}>&times;</span>
              <span className="title">Image Editor</span>
            </div>
            <div className="modal-body">
              <div className="sliders">
                <p className="item">
                  <span className="name">Grayscale</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="set"
                    value={this.state.grayscale}
                    onChange={e => {
                      this.setState({ grayscale: e.target.value });
                    }}
                  />
                </p>

                <p className="item">
                  <span className="name">Blur</span>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    className="set"
                    value={this.state.blur}
                    onChange={e => {
                      this.setState({ blur: e.target.value });
                    }}
                  />
                </p>

                <p className="item">
                  <span className="name">Exposure</span>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    className="set"
                    value={this.state.brightness}
                    onChange={e => {
                      this.setState({ brightness: e.target.value });
                    }}
                  />
                </p>

                <p className="item">
                  <span className="name">Contrast</span>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    className="set"
                    value={this.state.contrast}
                    onChange={e => {
                      this.setState({ contrast: e.target.value });
                    }}
                  />
                </p>

                <p className="item">
                  <span className="name">Hue Rotate</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    className="set"
                    value={this.state.hueRotate}
                    onChange={e => {
                      this.setState({ hueRotate: e.target.value });
                    }}
                  />
                </p>

                <p className="item">
                  <span className="name">Invert</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="set"
                    value={this.state.invert}
                    onChange={e => {
                      this.setState({ invert: e.target.value });
                    }}
                  />
                </p>

                <p className="item">
                  <span className="name">Saturate</span>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    className="set"
                    value={this.state.saturate}
                    onChange={e => {
                      this.setState({ saturate: e.target.value });
                    }}
                  />
                </p>

                <p className="item">
                  <span className="name">Sepia</span>
                  <input
                    type="range"
                    className="set"
                    min="0"
                    max="100"
                    value={this.state.sepia}
                    onChange={e => {
                      this.setState({ sepia: e.target.value });
                    }}
                  />
                </p>

                <p className="draw item">
                  <span className="name">Draw</span>
                  <input
                    type="color"
                    value={this.state.colorDraw}
                    className="drowSet"
                    onChange={e => this.setState({ colorDraw: e.target.value })}
                  />
                  <input
                    type="text"
                    className="drowSet sizeDraw"
                    placeholder="Size"
                    onChange={e => this.setState({ drawSize: e.target.value })}
                  />
                  <img
                    className="eraser"
                    onClick={this.drawTool}
                    alt="eraser"
                    src="https://png.icons8.com/material/50/000000/eraser.png"
                  />
                </p>

                <p className="addText item">
                  <span className="textSpan name">Add text:</span>
                  <form onSubmit={this.addText}>
                    <input
                      type="text"
                      name="textField"
                      className="addTextSet textField"
                      placeholder="Text"
                    />
                    <br />
                    <input type="text" name="x" placeholder="X" className="addTextSet" />
                    <input type="text" name="y" placeholder="Y" className="addTextSet"/>
                    <input
                      type="text"
                      name="size"
                      className="addTextSet sizeInput"
                      placeholder="Size"
                    />
                    <button type="submit" className="addTextBtn">
                      Add
                    </button>
                  </form>
                </p>

                <button className="btn" onClick={this.reset}>
                  Reset
                </button>

                <button className="btn" onClick={this.save}>
                  Save
                </button>
              </div>

              <div className="imageContainer">
                <canvas
                  className="colorCanvas"
                  ref={(el) => {this._colorCanvas = el}}
                  width={this.state.canvasWidth}
                  height={this.state.canvasHeight}
                />
                <canvas
                  className="drawCanvas"
                  ref={(el) => {this._drawCanvas = el}}
                  width={this.state.canvasWidth}
                  height={this.state.canvasHeight}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  drawTool = e => {
    if (this.state.drawTool === "draw") {
      e.target.className = "activeEraser eraser";
      this.setState({ drawTool: "erase" });
    } else {
      e.target.className = "eraser";
      this.setState({ drawTool: "draw" });
    }
  };

  addText = e => {
    let context = this.drawContext;
    context.globalCompositeOperation = "source-over";
    context.fillStyle = this.state.colorDraw;
    context.font = `bold ${e.target.size.value}px Arial`;
    context.fillText(
      `${e.target.textField.value}`,
      e.target.x.value,
      e.target.y.value
    );
    e.target.textField.value = e.target.x.value = e.target.y.value = e.target.size.value =
      "";
    e.preventDefault();
  };

  draw = (canvas, context) => {
    let canvasx = canvas.getBoundingClientRect().left;
    let canvasy = canvas.getBoundingClientRect().top;
    let last_mousex = 0;
    let last_mousey = 0;
    let mousex = 0;
    let mousey = 0;
    let mousedown = false;
    canvas.onmousedown = e => {
      last_mousex = mousex = parseInt(e.clientX - canvasx, 10);
      last_mousey = mousey = parseInt(e.clientY - canvasy, 10);
      mousedown = true;
    };

    //Mouseup
    canvas.onmouseup = e => {
      mousedown = false;
    };

    //Mousemove
    canvas.onmousemove = e => {
      mousex = parseInt(e.clientX - canvasx, 10);
      mousey = parseInt(e.clientY - canvasy, 10);
      if (mousedown) {
        context.beginPath();
        if (this.state.drawTool === "draw") {
          context.globalCompositeOperation = "source-over";
          context.strokeStyle = this.state.colorDraw;
          context.lineWidth = this.state.drawSize;
        } else {
          context.globalCompositeOperation = "destination-out";
          context.lineWidth = this.state.drawSize;
        }
        context.moveTo(last_mousex, last_mousey);
        context.lineTo(mousex, mousey);
        context.lineJoin = context.lineCap = "round";
        context.stroke();
      }
      last_mousex = mousex;
      last_mousey = mousey;
    };
  };

  reset = () => {
    this.setState({
      grayscale: 0,
      blur: 0,
      brightness: 100,
      contrast: 100,
      hueRotate: 0,
      invert: 0,
      saturate: 100,
      sepia: 0
    });
  };

  save = () => {
    let colorCanvas = ReactDOM.findDOMNode(this._colorCanvas);

    colorCanvas.getContext("2d").drawImage(this.drawCanvas, 0, 0);
    this.drawContext.drawImage(colorCanvas, 0, 0);
    const imgDataURL = colorCanvas.toDataURL();

    // send to UploadPhoto component
    this.props.returnPhoto(imgDataURL);

    ReactDOM.findDOMNode(this._modal).style.display = "none";
  };
}
