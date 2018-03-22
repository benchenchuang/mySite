








// 弹出提示性文字
function alertModel(text){
    var alertHtml=`<div class='tip_model'>${text}</div>`;
    $('body').append(alertHtml);
    setTimeout(function(){
            $(document).find('.tip_model').remove();
    },1500)
}