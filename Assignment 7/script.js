const api={
    key :"69fb07120fa83ccaeb44396cbd2a91a7",
    base : "https://api.openweathermap.org/data/2.5/"
}

$("#search").keypress(function(e){
    if(e.keyCode == 13)
    {

        loadApi($("#search").val());
    }
})


function loadApi(city){
    fetch(api.base+"weather?q="+city+",&units=metric&APPID="+api.key)
    .then((res)=>{ return res.json()})
    .then((data)=>{display(data)})
    .catch((err)=>{console.log(err.message)})
}

function display(data){
    $("#city_name").text(data.name+", "+data.sys.country);
    var date=new Date();
    $("#Date").text(dateBuilder(date));
    $("#Temp").text(temperature(data.main.temp));
   $("#icon").html(icon_change(data.weather));
   $("#Climate").text(climate_change(data.weather));
   $("#TempRange").text(temperature(data.main.temp_min)+"/"+temperature(data.main.temp_max));
}
function dateBuilder(d)
{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Friday","Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    var x=day+" "+date+" "+month+" "+year;
    return x;
    
}
function temperature(data){
    var y=Math.round(data)+"°C";
    return y;
}
function icon_change(data){
    var a=data[0].icon;
    a=a.substring(0,2)+"d";
    a='<img src="https://openweathermap.org/img/wn/'+a+'@2x.png">'
    return a;

}
function climate_change(data)
{
    var main=data[0].main;
    if(main.toLowerCase ()== 'clear')
    {
        var imgurl="https://images.unsplash.com/photo-1599270606287-331b4f5d0e02?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHN1bnNoaW5lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
    }
    else if(main.toLowerCase ()== 'clouds')
    {
        if((data[0].description).toLowerCase()== "few clouds"){var imgurl="https://images.unsplash.com/photo-1543746746-46047c4f4bb0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGZldyUyMGNsb3Vkc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";}
        else if((data[0].description).toLowerCase()== "scattered clouds"){var imgurl="https://images.unsplash.com/photo-1598378028718-37a61e030860?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2NhdHRlcmVkJTIwY2xvdWRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";}
        else {var  imgurl="https://images.unsplash.com/photo-1594156596782-656c93e4d504?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdWR5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";}
    }
    else if(main.toLowerCase ()== 'mist' || main.toLowerCase ()== 'smoke' || main.toLowerCase ()== 'haze' || main.toLowerCase ()== 'dust' || main.toLowerCase ()== 'fog' || main.toLowerCase ()== 'sand' || main.toLowerCase ()== 'dust' || main.toLowerCase ()== 'ash' || main.toLowerCase ()== 'squall' || main.toLowerCase ()== 'tornado')
    {
        var imgurl="https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWlzdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
    }
    else if(main.toLowerCase ()== 'snow'){var imgurl="https://images.unsplash.com/photo-1477601263568-180e2c6d046e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHNub3d8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";}
    else if(main.toLowerCase ()== 'rain'){  var imgurl="https://images.unsplash.com/photo-1589799790421-178330f91cfa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fHJhaW58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";}
    else if(main.toLowerCase ()== 'drizzle'){ var imgurl="https://images.unsplash.com/photo-1630574232726-fc3ea90637b8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGRyaXp6bGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";}
    else if(main.toLowerCase ()== 'thunderstorm'){ var imgurl="https://images.unsplash.com/photo-1551234250-d88208c2ce14?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGh1bmRlcnN0b3JtfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";}
    else{var imgurl="https://images.unsplash.com/photo-1503327431567-3ab5e6e79140?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2VhdGhlciUyMGFwcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";}

    document.querySelector("body").style.backgroundImage = "url("+imgurl+")";
    return data[0].main;
}
