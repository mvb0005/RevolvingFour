using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using RevolvingFour.Models;

namespace RevolvingFour.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Chat()
        {
            return View();
        }
        public ActionResult GamePlayer()
        {
            //ViewBag.Message = 
            return View();
        }

        public ActionResult Games()
        {
            var dbContext = new RevolvingFourGameDBContext();
            var games = from g in dbContext.Games orderby g.Last_Move_Date descending select g;
            ViewBag.games = games.ToList();
            return View();
        }
        public ActionResult AddGame()
        {
            var dbContext = new RevolvingFourGameDBContext();
            var random = new Random();
            var randomBoard = "";
            for (var i = 0; i < 49; i++)
            {
                randomBoard += random.Next(0, 3);
            }
            var game = new RevolvingFourGame()
            {
                Id = Guid.NewGuid(),
                Last_Move_Date = DateTime.Now.AddMinutes(random.Next(0, 200000)),
                Player1_turn = true,
                Board = randomBoard,
                Moves = "",
                Status = (byte)random.Next(0, 255)
            };
            dbContext.Games.Add(game);
            dbContext.SaveChanges();
            return Json(game, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetBoard(Guid? id)
        {
            var dbContext = new RevolvingFourGameDBContext();
            var game = from g in dbContext.Games where g.Id == id select g;
            if (game.Count() == 1)
            {
                return Json(game.First(), JsonRequestBehavior.AllowGet);
            } else
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest; 
                return Json(new { Error="Unable to get board"}, JsonRequestBehavior.AllowGet);
            }
        }
    }
}