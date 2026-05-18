using System;
using System.Collections.Generic;
using System.Text;
using Domain.Entities;

namespace Application.DTOs
{
    public record SubscriptionDto(
        int Id,
        string Type,
        string UserMail,
        decimal Price,
        decimal TotalPrice,
        string Status,
        DateTime StartDate,
        DateTime? EndDate,
        bool IsActive,
        int MonthsActive)
    {
        public static SubscriptionDto From(Subscription s) => new(
            s.Id,
            s.Type,
            s.UserMail.Value,
            s.Price,
            s.TotalPrice,
            s.Status.ToString(),
            s.StartDate,
            s.EndDate,
            s.IsActive(),
            s.MonthsActive());
    }
}
