using Microsoft.EntityFrameworkCore;
using DefaultWeb.Models.DefaultWebSite.Entities;
using DefaultWeb.Models.DefaultWebSite.DwsFile;

namespace DefaultWeb.Data
{
    public class DwsDbContext : DbContext
    {
        public DwsDbContext(DbContextOptions<DwsDbContext> options) : base(options)
        {
            
        }

        public DbSet<Source> Sources { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<DwsFileInfo> DwsFileInfo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Source>(entity =>
            {
                entity.Property(e => e.Description).IsRequired();
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasOne(s => s.Source)
                    .WithMany(c => c.Comments)
                    .HasForeignKey(d => d.SourceId);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
