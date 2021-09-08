let text=document.querySelector("input");
let btn=document.getElementById("btn");
let weather=document.getElementById("weather");
let loc=document.getElementById("location");
let speed=document.getElementById("speed");
let temp=document.getElementById("temp");
let minmax=document.getElementById("minmax");
let time=document.getElementById("time");
start();
function start(){
    getweather("london")
}
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let input=text.value;
    getweather(input);
    text.value="";
});
function icon_change(data){
    var a=data[0].icon;
    a=a.substring(0,2)+"d";
    a='<img src="https://openweathermap.org/img/wn/'+a+'@2x.png">'
    return a;
}
function climate_change(data)
{
    //console.log(data);
    var main=data[0].main;
    if(main.toLowerCase ()== 'clear')
    {
        var imgurl="images/clear.jpg";
    }
    else if(main.toLowerCase ()== 'clouds')
    {
        if((data[0].description).toLowerCase()== "few clouds"){var imgurl="images/few_cloud.jpg";}
        else if((data[0].description).toLowerCase()== "scattered clouds"){var imgurl="images/scattered_clouds.jpg";}
        else {var  imgurl="images/cloudy.jpg";}
    }
    else if(main.toLowerCase ()== 'mist' || main.toLowerCase ()== 'smoke' || main.toLowerCase ()== 'haze' || main.toLowerCase ()== 'dust' || main.toLowerCase ()== 'fog' || main.toLowerCase ()== 'sand' || main.toLowerCase ()== 'dust' || main.toLowerCase ()== 'ash' || main.toLowerCase ()== 'squall' || main.toLowerCase ()== 'tornado')
    {
        var imgurl="images/mist.jpg";
    }
    else if(main.toLowerCase ()== 'snow'){var imgurl="images/snow.jpg";}
    else if(main.toLowerCase ()== 'rain'){  var imgurl="images/rainy.png";}
    else if(main.toLowerCase ()== 'drizzle'){ var imgurl="images/drizzle.jpg";}
    else if(main.toLowerCase ()== 'thunderstorm'){ var imgurl="images/thunderstrom.jpg";}
    else{var imgurl="images/background.jpeg";}

    document.querySelector("body").style.backgroundImage = "url("+imgurl+")";
    return data[0].main;
}
function getweather(input){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=cc7b365cdf72c6b1736b020dc6c87432`)
    .then((result)=>{
        return result.json()
    })
    .then((data)=>{
        let txt=data.weather[0].description;
        weather.innerHTML=txt;
        txt=data.sys.country;
        loc.innerHTML=input.toUpperCase()+','+txt;
        txt=data.wind.speed;
        speed.innerHTML=txt+" kms";
        txt=parseInt(data.main.temp-273);
        temp.innerHTML=txt+"*C";
        txt=parseInt(data.main.temp_min-273);
        let txt2=parseInt(data.main.temp_max-273);
        minmax.innerHTML=txt+"*C(min) / "+txt2+"*C(max)";
        txt=new Date(data.dt).toDateString();
        time.innerHTML=txt;
    })
    .catch((err)=>{
        alert("Enter Valid Name");
        console.log(err.message);
    });
}
