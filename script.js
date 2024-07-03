// 添加事件监听器，监听生成账号和密码按钮的点击事件，并调用generateCredentials函数
document.getElementById('generateButton').addEventListener('click', generateCredentials);
// 添加事件监听器，监听生成用户名按钮的点击事件，并调用generateUsernameOnly函数
document.getElementById('generateUsernameButton').addEventListener('click', generateUsernameOnly);
// 添加事件监听器，监听复制用户名按钮的点击事件，并调用copyUsername函数
document.getElementById('copyUsername').addEventListener('click', copyUsername);
// 添加事件监听器，监听复制账号按钮的点击事件，并调用copyAccount函数
document.getElementById('copyAccount').addEventListener('click', copyAccount);
// 添加事件监听器，监听复制密码按钮的点击事件，并调用copyPassword函数
document.getElementById('copyPassword').addEventListener('click', copyPassword);
// 添加事件监听器，监听下载按钮的点击事件，并调用downloadCredentials函数
document.getElementById('downloadButton').addEventListener('click', downloadCredentials);
// 添加事件监听器，监听切换主题按钮的点击事件，并调用toggleTheme函数
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// 设置密钥，你可以替换成一个更安全的密钥
const secretKey = 'your-secret-key';

function loadTheme() {
    const theme = localStorage.getItem('theme'); // 从localStorage获取存储的主题
    if (theme === 'dark') {
        document.body.classList.add('dark-mode'); // 如果主题是dark，则添加dark-mode类
    } else {
        document.body.classList.remove('dark-mode'); // 否则移除dark-mode类
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode'); // 切换dark-mode类
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark'); // 如果包含dark-mode类，则将主题设置为dark
    } else {
        localStorage.setItem('theme', 'light'); // 否则将主题设置为light
    }
}

function generateCredentials() {
    const usernameType = document.getElementById('usernameType').value; // 获取用户名类型
    const usernameLength = document.getElementById('usernameLength').value; // 获取用户名长度
    const accountLength = document.getElementById('accountLength').value; // 获取账号长度
    const passwordLength = document.getElementById('passwordLength').value; // 获取密码长度
    const includeSpecialChars = document.getElementById('includeSpecialChars').checked; // 获取是否包含特殊字符
    const website = document.getElementById('website').value || '未指定网站'; // 获取网站名称，如果为空则设置为'未指定网站'

    // 根据用户名类型生成用户名
    const username = usernameType === 'chinese' ? generateChineseUsername(usernameLength) : generateEnglishUsername(usernameLength);
    const account = generateAccount(accountLength); // 生成账号
    const password = generatePassword(passwordLength, includeSpecialChars); // 生成密码

    // 显示生成的用户名、账号和密码
    document.getElementById('username').textContent = username;
    document.getElementById('account').textContent = account;
    document.getElementById('password').textContent = password;
    document.getElementById('strength').textContent = getPasswordStrength(password); // 显示密码强度

    // 记录生成的账号信息并加密存储到localStorage
    const record = `网站: ${website}\n用户名: ${username}\n账号: ${account}\n密码: ${password}\n\n`;
    const encryptedRecord = CryptoJS.AES.encrypt(record, secretKey).toString();
    localStorage.setItem('credentials', encryptedRecord);
}

function generateUsernameOnly() {
    const usernameType = document.getElementById('usernameType').value; // 获取用户名类型
    const usernameLength = document.getElementById('usernameLength').value; // 获取用户名长度

    // 根据用户名类型生成用户名
    const username = usernameType === 'chinese' ? generateChineseUsername(usernameLength) : generateEnglishUsername(usernameLength);

    // 显示生成的用户名
    document.getElementById('username').textContent = username;
}

function generateEnglishUsername(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // 英文用户名的字符集
    let username = '';
    for (let i = 0; i < length; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length)); // 随机选择字符生成用户名
    }
    return username;
}

function generateChineseUsername(length) {
    const surnames = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董粱杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴郁胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍卻璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄';
    const givenNames = '伟刚勇毅俊峰强军平保东文辉力明永健世广志义兴良海山仁波宁贵福生龙元全国胜学祥才发武新利清飞彬富顺信子杰涛昌成康星光天达安岩中茂进林有坚和彪博诚先敬震振壮会思群豪心邦承乐绍功松善厚庆磊民友裕河哲江超浩亮政谦亨奇固之轮翰朗伯宏言若鸣朋斌梁栋维启克伦翔旭鹏泽晨辰士以建家致树炎德行时泰盛雄琛钧冠策腾楠榕风航弘';

    let surname = surnames.charAt(Math.floor(Math.random() * surnames.length)); // 随机选择一个姓氏
    let givenName = '';
    for (let i = 0; i < length - 1; i++) {
        givenName += givenNames.charAt(Math.floor(Math.random() * givenNames.length)); // 随机选择字符生成名字
    }
    return surname + givenName; // 返回完整的中文用户名
}

function generateAccount(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 账号的字符集
    let account = '';
    for (let i = 0; i < length; i++) {
        account += characters.charAt(Math.floor(Math.random() * characters.length)); // 随机选择字符生成账号
    }
    return account;
}

function generatePassword(length, includeSpecialChars) {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';

    let password = '';
    const charSet = lowerCase + upperCase + numbers + (includeSpecialChars ? specialCharacters : ''); // 根据是否包含特殊字符决定字符集
    password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
    password += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    if (includeSpecialChars) {
        password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
    }

    for (let i = password.length; i < length; i++) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length)); // 随机选择字符生成密码
    }

    return password.split('').sort(() => Math.random() - 0.5).join(''); // 将密码字符打乱顺序后返回
}

function getPasswordStrength(password) {
    const result = zxcvbn(password); // 使用zxcvbn库评估密码强度
    return `安全等级: ${result.score} / 4 - ${result.feedback.suggestions.join(' ')}`; // 返回密码强度和建议
}

function copyUsername() {
    copyToClipboard(document.getElementById('username').textContent); // 复制用户名到剪贴板
}

function copyAccount() {
    copyToClipboard(document.getElementById('account').textContent); // 复制账号到剪贴板
}

function copyPassword() {
    copyToClipboard(document.getElementById('password').textContent); // 复制密码到剪贴板
}

function copyToClipboard(text) {
    const tempInput = document.createElement('input'); // 创建一个临时输入框
    tempInput.value = text; // 设置输入框的值为要复制的文本
    document.body.appendChild(tempInput); // 将输入框添加到文档中
    tempInput.select(); // 选择输入框中的文本
    document.execCommand('copy'); // 执行复制命令
    document.body.removeChild(tempInput); // 移除临时输入框
    alert('复制成功: ' + text); // 弹出复制成功提示
}

function downloadCredentials() {
    const encryptedRecord = localStorage.getItem('credentials'); // 从localStorage获取加密的账号记录
    if (!encryptedRecord) {
        alert('没有可下载的记录'); // 如果没有记录，则弹出提示
        return;
    }

    const decryptedRecord = CryptoJS.AES.decrypt(encryptedRecord, secretKey).toString(CryptoJS.enc.Utf8); // 解密记录
    const fileNameInput = document.getElementById('fileName').value.trim(); // 获取文件名输入框的值
    const fileName = fileNameInput ? `${fileNameInput}.txt` : 'credentials.txt'; // 设置文件名

    const blob = new Blob([decryptedRecord], { type: 'text/plain' }); // 创建一个Blob对象
    const url = URL.createObjectURL(blob); // 创建一个URL对象
    const a = document.createElement('a'); // 创建一个a标签
    a.href = url; // 设置a标签的href属性
    a.download = fileName; // 设置a标签的下载文件名
    a.click(); // 模拟点击a标签
    URL.revokeObjectURL(url); // 释放URL对象
}

function exportToCSV() {
    const encryptedRecord = localStorage.getItem('credentials'); // 从localStorage获取加密的账号记录
    if (!encryptedRecord) {
        alert('没有可导出的记录'); // 如果没有记录，则弹出提示
        return;
    }

    const decryptedRecord = CryptoJS.AES.decrypt(encryptedRecord, secretKey).toString(CryptoJS.enc.Utf8); // 解密记录
    const rows = decryptedRecord.split('\n\n').map(record => record.split('\n').map(field => field.split(': ')[1]).join(',')); // 处理记录生成CSV内容
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e).join("\n"); // 创建CSV内容

    const encodedUri = encodeURI(csvContent); // 编码URI
    const link = document.createElement("a"); // 创建一个a标签
    link.setAttribute("href", encodedUri); // 设置a标签的href属性
    link.setAttribute("download", "credentials.csv"); // 设置a标签的下载文件名
    document.body.appendChild(link); // 将a标签添加到文档中
    link.click(); // 模拟点击a标签
    document.body.removeChild(link); // 移除a标签
}

function exportToJSON() {
    const encryptedRecord = localStorage.getItem('credentials'); // 从localStorage获取加密的账号记录
    if (!encryptedRecord) {
        alert('没有可导出的记录'); // 如果没有记录，则弹出提示
        return;
    }

    const decryptedRecord = CryptoJS.AES.decrypt(encryptedRecord, secretKey).toString(CryptoJS.enc.Utf8); // 解密记录
    const blob = new Blob([decryptedRecord], { type: 'application/json' }); // 创建一个Blob对象
    const url = URL.createObjectURL(blob); // 创建一个URL对象
    const a = document.createElement('a'); // 创建一个a标签
    a.href = url; // 设置a标签的href属性
    a.download = 'credentials.json'; // 设置a标签的下载文件名
    a.click(); // 模拟点击a标签
    URL.revokeObjectURL(url); // 释放URL对象
}

function importFromFile(event) {
    const file = event.target.files[0]; // 获取上传的文件
    if (!file) return;

    const reader = new FileReader(); // 创建一个FileReader对象
    reader.onload = function(e) {
        const contents = e.target.result; // 获取文件内容
        const encryptedRecord = CryptoJS.AES.encrypt(contents, secretKey).toString(); // 加密内容
        localStorage.setItem('credentials', encryptedRecord); // 存储到localStorage
        alert('导入成功'); // 弹出导入成功提示
    };
    reader.readAsText(file); // 读取文件内容
}

// 初始加载主题
document.addEventListener('DOMContentLoaded', loadTheme);
