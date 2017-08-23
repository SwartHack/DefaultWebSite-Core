using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DefaultWeb2.Models.DefaultWebSite;

namespace DefaultWeb2.Data
{
    public class DwsDbContext : DbContext
    {
        public DwsDbContext(DbContextOptions<DwsDbContext> options) : base(options)
        {

        }

        public DbSet<Source> Sources { get; set; }
        public DbSet<Comment> Comments { get; set; }

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
        }
    }
}
