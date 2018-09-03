
function GetUrlParam(paraName) {
　　　　var url = document.location.toString();
　　　　var arrObj = url.split("?");
　　　　if (arrObj.length > 1) {
　　　　　　var arrPara = arrObj[1].split("&");
　　　　　　var arr;

　　　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　　　　arr = arrPara[i].split("=");

　　　　　　　　if (arr != null && arr[0] == paraName) {
　　　　　　　　　　return arr[1];
　　　　　　　　}
　　　　　　}
　　　　　　return "";
　　　　}
　　　　else {
　　　　　　return "";
　　　　}
　　}
// 弹出提示性文字
function alertModel(text){
    var alertHtml=`<div class='tip_model'>${text}</div>`;
    $('body').append(alertHtml);
    setTimeout(function(){
            $(document).find('.tip_model').remove();
    },1500)
};

/*设置cookie*/
function setCookie(name, value, iDay)
{
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay);
    document.cookie=name+'='+value+';expires='+oDate;
};
/*使用方法：setCookie('user', 'simon', 11);*/
/*获取cookie*/
function getCookie(name)
{
  var arr=document.cookie.split('; '); //多个cookie值是以; 分隔的，用split把cookie分割开并赋值给数组
  for(var i=0;i<arr[i].length;i++) //历遍数组
  {
    var arr2=arr[i].split('='); //原来割好的数组是：user=simon，再用split('=')分割成：user simon 这样可以通过arr2[0] arr2[1]来分别获取user和simon 
    if(arr2[0]==name) //如果数组的属性名等于传进来的name
    {
      return arr2[1]; //就返回属性名对应的值
    }
    return ''; //没找到就返回空
  }
};
/*删除cookie*/
function removeCookie(name)
{
  setCookie(name, 1, -1); //-1就是告诉系统已经过期，系统就会立刻去删除cookie
};
 