const { genPassword, validatePassword } = require('../../utils/password');

describe('Utils', () => {
  describe('Password', () => {
    
    describe('genPassword', () => {
      it('should generate a hash and salt when genPassword is called', () => {
        const password = 'password';
        const result = genPassword(password);
        expect(result).toHaveProperty('genHash');
        expect(result).toHaveProperty('salt');
      });
    });

    describe('validatePassword', () => {
      const hash = 'd8b0056c6b3f7cc9fbf3fcb278210eb0ec93dee5d659600289762eca86a5cbc90ed470d8f7882451fdedac520e4f0501b848f1c800c2c59d7c6cdac52807032a';
      const salt = '39b812c4e567085410885f9a126554ff04d41aa9df597725bfc4fcdcf8956c63';

      it('should return true when the password is valid', () => {
        const validPassword = 'password';
        const result = validatePassword(validPassword, hash, salt);
        expect(result).toBe(true);
      });

      it('should return false when the password is not valid', () => {
        const validPassword = 'password2';
        const result = validatePassword(validPassword, hash, salt);
        expect(result).toBe(false);
      });
    });
  });
});
