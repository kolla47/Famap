namespace Famap.Server.Models.DB;

public partial class Person
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public DateOnly DateOfBirth { get; set; }

    public string Gender { get; set; } = null!;

    public string? Address { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public Guid? MotherId { get; set; }

    public Guid? FatherId { get; set; }

    public Guid? SpouseId { get; set; }

    public virtual Person? Father { get; set; }

    public virtual ICollection<Person> FatherOf { get; set; } = new List<Person>();

    public virtual ICollection<Person> MotherOf { get; set; } = new List<Person>();

    public virtual ICollection<Person> SpouseOf { get; set; } = new List<Person>();

    public virtual Person? Mother { get; set; }

    public virtual Person? Spouse { get; set; }
}
