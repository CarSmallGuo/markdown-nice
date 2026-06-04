export default `/* 全栈蓝 */

#nice {
    margin: 0;
    padding: 0 10px;
    width: auto;
    color: rgb(0, 0, 0);
    font-family: Optima, PingFangSC-light, serif;
    font-size: 16px;
    line-height: 1.5em;
    letter-spacing: 0em;
    word-spacing: 0em;
    word-break: break-word;
    overflow-wrap: break-word;
    text-align: left;
    background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.03) 0%, rgba(255, 255, 255, 0) 11.49%),
        linear-gradient(360deg, rgba(50, 0, 0, 0.04) 0%, rgba(255, 255, 255, 0) 12.16%);
    background-size: 20px 20px, 20px 20px;
    background-position: left top;
    background-repeat: repeat, repeat;
}

#nice p {
    color: rgb(43, 43, 43);
    font-size: 14px;
    line-height: 1.8em;
    letter-spacing: 0.02em;
    text-align: left;
    text-indent: 0em;
    margin: 0;
    padding: 8px 0;
}

#nice h1,
#nice h2,
#nice h3,
#nice h4,
#nice h5,
#nice h6 {
    margin: 30px 0 15px;
    padding: 0;
    font-weight: bold;
    color: black;
}

#nice h1 {
    display: flex;
}

#nice h1 .prefix,
#nice h1 .suffix,
#nice h2 .prefix,
#nice h2 .suffix,
#nice h3 .prefix,
#nice h3 .suffix,
#nice h4 .prefix,
#nice h4 .suffix,
#nice h5 .prefix,
#nice h5 .suffix,
#nice h6 .prefix,
#nice h6 .suffix {
    display: none;
}

#nice h1 .content {
    display: block;
    color: rgb(64, 184, 250);
    font-size: 24px;
    line-height: 1.5em;
    letter-spacing: 0em;
    font-weight: bold;
}

#nice h2 {
    display: block;
    border-bottom: 4px solid rgb(64, 184, 250);
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
    background: rgba(64, 184, 250, 0.5);
    justify-content: flex-end;
    float: right;
    margin-top: -10px;
}

#nice h2 .content {
    display: flex;
    color: rgb(64, 184, 250);
    font-size: 20px;
    line-height: 1.5em;
    margin-left: 25px;
}

#nice h3 {
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
}

#nice h3 .content {
    border-bottom: 2px solid rgba(79, 177, 249, 0.65);
    color: rgb(43, 43, 43);
    padding-bottom: 2px;
}

#nice h4 .content {
    height: 16px;
    line-height: 16px;
    font-size: 16px;
}

#nice ul,
#nice ol {
    margin: 8px 0;
    padding: 0 0 0 25px;
    color: rgb(0, 0, 0);
}

#nice ul {
    list-style-type: disc;
}

#nice ol {
    list-style-type: decimal;
}

#nice li section {
    margin: 5px 0;
    color: rgb(89, 89, 89);
    font-size: 14px;
    line-height: 1.8em;
    letter-spacing: 0.02em;
    text-align: left;
    font-weight: normal;
}

#nice blockquote,
#nice blockquote.multiquote-1 {
    display: block;
    overflow: auto;
    margin: 20px 0;
    padding: 10px 10px 10px 20px;
    border: 1px solid rgba(64, 184, 255, 0.4);
    border-radius: 8px;
    color: rgb(59, 59, 59);
    background: rgba(64, 184, 250, 0.1);
    box-shadow: rgba(0, 0, 0, 0) 0 0 0 0;
}

#nice blockquote::before {
    content: '❝';
    display: block;
    color: rgba(64, 184, 250, 0.5);
    font-size: 28px;
    line-height: 1.5em;
    letter-spacing: 0em;
    text-align: left;
    font-weight: bold;
}

#nice blockquote p,
#nice blockquote.multiquote-1 p {
    color: rgb(59, 59, 59);
    font-size: 14px;
    line-height: 1.8em;
    letter-spacing: 0.02em;
    text-align: left;
    font-weight: normal;
    margin: 0;
    padding: 8px 0;
}

#nice a {
    color: rgb(64, 184, 250);
    font-weight: bold;
    border-bottom: 1px solid rgb(59, 170, 250);
    text-decoration: none;
    overflow-wrap: break-word;
}

#nice strong {
    color: rgb(53, 148, 247);
    font-weight: bold;
}

#nice em,
#nice em strong,
#nice del {
    color: rgb(53, 148, 247);
    font-weight: bold;
}

#nice hr {
    height: 1px;
    padding: 0;
    border: none;
    border-top: 2px solid rgb(59, 170, 250);
}

#nice figure {
    margin: 10px 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#nice img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
    border: none;
    border-radius: 8px;
    object-fit: fill;
    box-shadow: rgb(153, 153, 153) 2px 4px 8px 0px;
}

#nice p code,
#nice li code {
    color: rgb(53, 148, 247);
    font-size: 14px;
    line-height: 1.8em;
    letter-spacing: 0em;
    background: rgba(27, 31, 35, 0.05);
    width: auto;
    height: auto;
    margin: 0 2px;
    padding: 2px 4px;
    border: none;
    border-radius: 4px;
    overflow-wrap: break-word;
    font-family: 'Operator Mono', Consolas, Monaco, Menlo, monospace;
    word-break: break-all;
}

#nice pre {
    text-align: left;
    margin: 10px 0;
    padding: 0;
}

#nice pre code {
    font-family: Consolas, Monaco, Menlo, monospace;
    font-size: 12px;
    letter-spacing: 0px;
}

#nice table {
    border-collapse: collapse;
    margin: 10px 0;
}

#nice table tr th,
#nice table tr td {
    font-size: 14px;
    color: rgb(89, 89, 89);
}
`;
