using ConsoleApp1;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    public static async Task<WeatherAPI> DoAction()
    {
        WeatherAPI weatherData = null;
        string apiKey = "97f9140b9fb94d86baa142722251604";
        string city = "brazil";
        string days = "7";
        //string url = $"https://api.weatherapi.com/v1/current.json?key={apiKey}&q={city}&days={days}&aqi=yes;";
        string url2 = $"https://api.weatherapi.com/v1/forecast.json?key={apiKey}&q={city}&days={days}&aqi=yes&alerts=no";
        using (HttpClient http = new HttpClient())
        {
            var response = await http.GetStringAsync(url2);
            weatherData = JsonConvert.DeserializeObject <WeatherAPI>(response);
        }
        return weatherData;
    }
    static async Task Main()
    {
        WeatherAPI xx = await DoAction();
    }
}
