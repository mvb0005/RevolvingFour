//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RevolvingFour.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class RevolvingFourGame
    {
        public System.Guid Id { get; set; }
        public System.DateTime Last_Move_Date { get; set; }
        public bool Player1_turn { get; set; }
        public string Board { get; set; }
        public string Moves { get; set; }
        public byte Status { get; set; }
    }
}
