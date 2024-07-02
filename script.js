document.getElementById('generateButton').addEventListener('click', generateCredentials);
document.getElementById('generateUsernameButton').addEventListener('click', generateUsernameOnly);
document.getElementById('copyUsername').addEventListener('click', copyUsername);
document.getElementById('copyAccount').addEventListener('click', copyAccount);
document.getElementById('copyPassword').addEventListener('click', copyPassword);
document.getElementById('downloadButton').addEventListener('click', downloadCredentials);

const secretKey = 'your-secret-key'; // 你可以替换成一个更安全的密钥

function generateCredentials() {
    try {
        // 清空之前的记录
        localStorage.removeItem('credentials');

        const usernameType = document.getElementById('usernameType').value;
        const usernameLength = document.getElementById('usernameLength').value;
        const accountLength = document.getElementById('accountLength').value;
        const passwordLength = document.getElementById('passwordLength').value;
        const includeSpecialChars = document.getElementById('includeSpecialChars').checked;
        const website = document.getElementById('website').value || '未指定网站';

        const username = usernameType === 'chinese' ? generateChineseUsername(usernameLength) : generateEnglishUsername(usernameLength);
        const account = generateAccount(accountLength);
        const password = generatePassword(passwordLength, includeSpecialChars);

        document.getElementById('username').textContent = username;
        document.getElementById('account').textContent = account;
        document.getElementById('password').textContent = password;
        document.getElementById('strength').textContent = getPasswordStrength(password);

        const record = `网站: ${website}\n用户名: ${username}\n账号: ${account}\n密码: ${password}\n\n`;
        const encryptedRecord = CryptoJS.AES.encrypt(record, secretKey).toString();
        localStorage.setItem('credentials', encryptedRecord);
    } catch (error) {
        console.error("Error generating credentials:", error);
    }
}

function generateUsernameOnly() {
    try {
        const usernameType = document.getElementById('usernameType').value;
        const usernameLength = document.getElementById('usernameLength').value;

        const username = usernameType === 'chinese' ? generateChineseUsername(usernameLength) : generateEnglishUsername(usernameLength);

        document.getElementById('username').textContent = username;
    } catch (error) {
        console.error("Error generating username:", error);
    }
}

function generateEnglishUsername(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let username = '';
    for (let i = 0; i < length; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return username;
}

function generateChineseUsername(length) {
    const characters = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董粱杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴郁胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍卻璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄';
    let username = '';
    for (let i = 0; i < length; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return username;
}

function generateAccount(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let account = '';
    for (let i = 0; i < length; i++) {
        account += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return account;
}

function generatePassword(length, includeSpecialChars) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const specialCharacters = '!@#$%^&*()';
    let password = '';
    const charSet = includeSpecialChars ? characters + specialCharacters : characters;
    for (let i = 0; i < length; i++) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return password;
}

function copyUsername() {
    copyToClipboard(document.getElementById('username').textContent);
}

function copyAccount() {
    copyToClipboard(document.getElementById('account').textContent);
}

function copyPassword() {
    copyToClipboard(document.getElementById('password').textContent);
}

function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('复制成功: ' + text);
}

function downloadCredentials() {
    const encryptedRecord = localStorage.getItem('credentials');
    if (!encryptedRecord) {
        alert('没有可下载的记录');
        return;
    }

    const decryptedRecord = CryptoJS.AES.decrypt(encryptedRecord, secretKey).toString(CryptoJS.enc.Utf8);
    const fileNameInput = document.getElementById('fileName').value.trim();
    const fileName = fileNameInput ? `${fileNameInput}.txt` : 'credentials.txt';

    const blob = new Blob([decryptedRecord], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
}

function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
        case 1:
            return "弱";
        case 2:
            return "一般";
        case 3:
            return "中等";
        case 4:
            return "强";
        case 5:
            return "非常强";
        default:
            return "弱";
    }
}

function exportToCSV() {
    const encryptedRecord = localStorage.getItem('credentials');
    if (!encryptedRecord) {
        alert('没有可导出的记录');
        return;
    }

    const decryptedRecord = CryptoJS.AES.decrypt(encryptedRecord, secretKey).toString(CryptoJS.enc.Utf8);
    const rows = decryptedRecord.split('\n\n').map(record => record.split('\n').map(field => field.split(': ')[1]).join(','));
    const csvContent = "data:text/csv;charset=utf-8," + rows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'credentials.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportToJSON() {
    const encryptedRecord = localStorage.getItem('credentials');
    if (!encryptedRecord) {
        alert('没有可导出的记录');
        return;
    }

    const decryptedRecord = CryptoJS.AES.decrypt(encryptedRecord, secretKey).toString(CryptoJS.enc.Utf8);
    const records = decryptedRecord.split('\n\n').map(record => {
        const fields = record.split('\n');
        return {
            website: fields[0].split(': ')[1],
            username: fields[1].split(': ')[1],
            account: fields[2].split(': ')[1],
            password: fields[3].split(': ')[1]
        };
    });
    const jsonContent = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records));
    const link = document.createElement('a');
    link.setAttribute('href', jsonContent);
    link.setAttribute('download', 'credentials.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function importFromFile(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('没有选择文件');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const records = JSON.parse(content);
        records.forEach(record => {
            const recordString = `网站: ${record.website}\n用户名: ${record.username}\n账号: ${record.account}\n密码: ${record.password}\n\n`;
            const encryptedRecordString = CryptoJS.AES.encrypt(recordString, secretKey).toString();
            localStorage.setItem('credentials', (localStorage.getItem('credentials') || '') + encryptedRecordString);
        });
        alert('导入成功');
    };
    reader.readAsText(file);
}

document.addEventListener("DOMContentLoaded", function() {
    // 任何需要在页面加载时执行的初始化操作可以放在这里
    $('[data-toggle="tooltip"]').tooltip();
});
