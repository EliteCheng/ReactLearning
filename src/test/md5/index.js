import md5 from 'md5'


window.md5 = md5
window.encodeUtf8 = encodeUtf8
window.decodeUtf8 = decodeURIComponent

function encodeUtf8(text) {
    const code = encodeURIComponent(text);
    const bytes = [];
    for (let i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            bytes.push(hexVal);
            i += 2;
        } else bytes.push(c.charCodeAt(0));
    }
    let encoded = "";
    for (let i = 0; i < bytes.length; i++) {
        encoded += '%' + bytes[i].toString(16).toUpperCase();
    }
    return encoded;
}
