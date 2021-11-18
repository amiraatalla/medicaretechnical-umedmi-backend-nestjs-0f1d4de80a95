declare global {
  interface Date {
    addSeconds(seconds: number): Date;
  }
}

export function initDateHelpers() {
  Date.prototype.addSeconds = function(seconds: number): Date {
    this.setSeconds(this.getSeconds() + seconds);
    return this;
  };
}
