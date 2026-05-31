export default `/* 全栈蓝 */

#nice {
    line-height: 2.25;
    color: #2b2b2b;
    font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light;
    letter-spacing: 2px;
    background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%),
        linear-gradient(360deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%);
    background-size: 20px 20px;
    background-position: center center;
}
#nice h1,
#nice h2,
#nice h3,
#nice h4,
#nice h5,
#nice h6,
#nice p,
#nice pre {
    margin: 1em 0;
}
#nice p {
    color: #2b2b2b;
    margin: 10px 0px;
    letter-spacing: 2px;
    font-size: 14px;
    word-spacing: 2px;
}
#nice h1 {
    font-size: 25px;
}
#nice h1 span {
    display: inline-block;
    font-weight: bold;
    color: #40b8fa;
}
#nice h2 {
    display: block;
    border-bottom: 4px solid #40b8fa;
}
#nice h2 span {
    display: flex;
    color: #40b8fa;
    font-size: 20px;
    margin-left: 25px;
}
#nice h2::before {
    content: '';
    display: flex;
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
    background-image: url(https://imgkr.cn-bj.ufileos.com/15fdfb3c-b350-4da9-928e-5f8c506ec325.png);
    margin-bottom: -22px;
}
#nice h2::after {
    content: '';
    display: flex;
    box-sizing: border-box;
    width: 200px;
    height: 10px;
    border-top-left-radius: 20px;
    background: RGBA(64, 184, 250, 0.5);
    color: rgb(255, 255, 255);
    font-size: 16px;
    letter-spacing: 0.544px;
    justify-content: flex-end;
    box-sizing: border-box !important;
    overflow-wrap: break-word !important;
    float: right;
    margin-top: -10px;
}
#nice h3 {
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
}
#nice h3 span {
    border-bottom: 2px solid RGBA(79, 177, 249, 0.65);
    color: #2b2b2b;
    padding-bottom: 2px;
}
#nice h4 span {
    height: 16px;
    line-height: 16px;
    font-size: 16px;
}
#nice ul {
    font-size: 15px;
    color: #595959;
    list-style-type: circle;
}
#nice ol {
    font-size: 15px;
    color: #595959;
}
#nice blockquote::before {
    content: '❝';
    color: RGBA(64, 184, 250, 0.5);
    font-size: 34px;
    line-height: 1;
    font-weight: 700;
}
#nice blockquote {
    text-size-adjust: 100%;
    line-height: 1.55em;
    font-weight: 400;
    border-radius: 6px;
    color: #595959;
    font-style: normal;
    text-align: left;
    box-sizing: inherit;
    border-left: none;
    border: 1px solid RGBA(64, 184, 250, 0.4);
    background: RGBA(64, 184, 250, 0.1);
    padding: 1em;
    margin: 0;
}
#nice blockquote p {
    color: #595959;
}
#nice blockquote::after {
    content: '❞';
    float: right;
    color: RGBA(64, 184, 250, 0.5);
}
#nice a {
    color: #40b8fa;
    font-weight: normal;
    border-bottom: 1px solid #3baafa;
}
#nice strong::before {
    content: '「';
}
#nice strong {
    color: #3594f7;
    font-weight: bold;
}
#nice strong::after {
    content: '」';
}
#nice em {
    color: #3594f7;
    font-weight: bold;
}
#nice em strong {
    color: #3594f7;
}
#nice del {
    color: #3594f7;
}
#nice hr {
    height: 1px;
    padding: 0;
    border: none;
    border-top: 2px solid #3baafa;
}
#nice img {
    max-width: 100%;
    border-radius: 6px;
    display: block;
    margin: 20px auto;
    object-fit: contain;
    box-shadow: 2px 4px 7px #999;
}
#nice p code,
#nice li code {
    color: #3594f7;
    background: RGBA(59, 170, 250, 0.1);
    display: inline-block;
    padding: 0 2px;
    border-radius: 2px;
    height: 21px;
    line-height: 22px;
}
#nice pre code {
    letter-spacing: 0px;
}
#nice table tr th,
#nice table tr td {
    font-size: 14px;
    color: #595959;
}
`;
