using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace thyrel_api.Websocket
{
    public static class Json
    {
        public static string Serialize(object obj)
        {
            var contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            };

            return JsonConvert.SerializeObject(obj,
                new JsonSerializerSettings
                {
                    ContractResolver = contractResolver,
                    Formatting = Formatting.Indented,
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
        }
    }
}