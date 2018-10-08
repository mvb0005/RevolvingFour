using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace RevolvingFour.Models
{
    public class RevolvingFourGame
    {
        public Guid Id { get; set; }
        public DateTime Last_Move_Date { get; set; }
        public bool Player1_turn { get; set; }
        public string Board { get; set; }
        public string Moves { get; set; }
        public byte Status { get; set; }
    }

    public class RevolvingFourGameDBContext : DbContext
    {
        public DbSet<RevolvingFourGame> Games { get; set; }
    }
}