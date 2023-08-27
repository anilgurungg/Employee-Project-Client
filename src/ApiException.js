class ApiException extends Error {
    constructor(message, status) {
      super(message);
      this.name = 'ApiException';
      this.status = status || 500;
    }

    // constructor(message, status, errorStrings, success) {
    //   super(message);
    //   this.name = 'ApiException';
    //   this.status = status || 500;
    //   this.success = success;
    //   this.errorStrings = errorStrings;
    // }
  }
  
  export default ApiException;
  