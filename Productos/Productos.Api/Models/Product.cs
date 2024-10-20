using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Productos.Api.Models
{
    public class Product
    {
        public int Id { get; set; }

        [MaxLength(20)] 
        public required string Name { get; set; }

        [DataType(DataType.MultilineText)]
        [MaxLength(100)]
        public string Description { get; set; } = null!;

        [DataType(DataType.MultilineText)]
        [MaxLength(20)]
        public string stock { get; set; } = null!;

        [Column(TypeName = "decimal(18,2)")]
        [DisplayFormat(DataFormatString = "{0:C2}")]
        public required decimal Price { get; set; }

        [MaxLength(50)]
        public required string CreationDate { get; set; }

        [MaxLength(50)]
        public string LastUpdate { get; set; }

    }
}
