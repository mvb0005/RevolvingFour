using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
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

        public ActionResult Games(int page = 1)
        {

            using (var dbContext = new Entities())
            {
                var retval = new ObjectParameter("retval", typeof(int));
                var res1 = dbContext.uspCountAllGames(retval);
                var res = dbContext.uspGetAllGames();
                ViewBag.games = res.ToList();
                ViewBag.Page = retval.Value;
                return View();
            }
        }
        public ActionResult AddGame()
        {
            var dbContext = new Entities();
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
            dbContext.RevolvingFourGames.Add(game);
            dbContext.SaveChanges();
            return Json(game, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetBoard(Guid? id)
        {
            var dbContext = new Entities();
            var game = from g in dbContext.RevolvingFourGames where g.Id == id select g;
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