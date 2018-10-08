using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace RevolvingFour
{
    public class GameHub : Hub
    {
        public void Send(string gameId, string message)
        {
            Clients.All.addNewMessageToPage(gameId, message);
        }

        public Task JoinRoom(string roomName)
        {
            return Groups.Add(Context.ConnectionId, roomName);
        }

        public void UpdateGame(string roomName, string action)
        {
            Clients.Group(roomName).updateGame(action);
        }
    }
}