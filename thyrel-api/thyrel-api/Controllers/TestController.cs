using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.Controllers.ModelsControllers;
using thyrel_api.Models;
using thyrel_api.Websocket;

namespace thyrel_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private IWebsocketHandler _websocketHandler;

        public TestController(IWebsocketHandler websocketHandler)
        {
            _websocketHandler = websocketHandler;
        }

        // GET: api/Test
        [HttpGet]
        public async Task<ActionResult<Player>> Get()
        {
            var rc = new RoomController();
            var pc = new PlayerController();
            var tc = new TokenController();

            var room = rc.Add();
            var token = tc.Add();
            var player = pc.Add("jean", "didier", true, room.Id ?? 1, token.Id ?? 1);
            
            return pc.GetPlayer(player.Id ?? 1);
        }
        
        // POST: api/Test
        [HttpPost]
        public IEnumerable<string> Post([FromBody] string value)
        {
            var isInt = int.TryParse(value, out var intValue);
            _websocketHandler.SendMessageToSockets("YOYO here", isInt ? intValue : null);
            return new[] { "Here is you're value", value};
        }
    }
}
