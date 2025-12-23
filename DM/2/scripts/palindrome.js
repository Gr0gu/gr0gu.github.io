export default function palindrome(str) {
    const rev = str.split('').reverse().join('');
    
    for (let i = 0; i < str.length; i++) {
        if (str.startsWith(rev.substring(i))) {
            return rev.substring(0, i) + str;
        }
    }
    // Fallback
    return rev + str;
}