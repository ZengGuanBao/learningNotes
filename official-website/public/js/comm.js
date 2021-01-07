var commonJs = {
  formatTime: function (time) {
    if (!time) return false;
    time = time.replace(new RegExp(/-/gm) ,"/");
    return time
  }
}