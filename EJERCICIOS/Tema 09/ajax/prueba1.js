if (window.XMLHttpRequest) {
  httpReq = new XMLHttpRequest();
} else if (window.ActiveXObject) {
  //para Internet Explorer
  httpReq = new ActiveXObject("Microsoft.XMLHTTP");
}

function DameAjxInst() {
  let InstAjax = false;
  try {
    InstAjax = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (E) {
    InstAjax = new XMLHttpRequest();
  }
  return InstAjax;
}
