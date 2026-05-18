using System;
using System.Collections.Generic;
using System.Text;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infraestructure.Persistence
{
    public class SubscriptionConfig : IEntityTypeConfiguration<Subscription>
    {
        public void Configure(EntityTypeBuilder<Subscription> builder)
        {
            builder.HasKey(s => s.Id);

            builder.Property(s => s.Type)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(s => s.Price)
                   .HasColumnType("decimal(18,2)");

            builder.Property(s => s.TotalPrice)
                   .HasColumnType("decimal(18,2)");

            builder.Property(s => s.Status)
                   .HasConversion<string>()
                   .HasMaxLength(20);

            builder.Property(s => s.StartDate)
                   .IsRequired();

            builder.OwnsOne(s => s.UserMail, email =>
            {
                email.Property(e => e.Value)
                     .HasColumnName("UserMail")
                     .IsRequired()
                     .HasMaxLength(254);

                email.HasIndex(e => e.Value);
            });
        }
    }
}
