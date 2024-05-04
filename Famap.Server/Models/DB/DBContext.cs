using Microsoft.EntityFrameworkCore;

namespace Famap.Server.Models.DB;

public partial class DBContext : DbContext
{
    public DBContext()
    {
    }

    public DBContext(DbContextOptions<DBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Person> People { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=DB");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Person__3214EC07C8100136");

            entity.ToTable("Person");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);

            entity.HasOne(d => d.Father).WithMany(p => p.FatherOf)
                .HasForeignKey(d => d.FatherId)
                .HasConstraintName("FK_Father");

            entity.HasOne(d => d.Mother).WithMany(p => p.MotherOf)
                .HasForeignKey(d => d.MotherId)
                .HasConstraintName("FK_Mother");

            entity.HasOne(d => d.Spouse).WithMany(p => p.SpouseOf)
                .HasForeignKey(d => d.SpouseId)
                .HasConstraintName("FK_Spouse");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
