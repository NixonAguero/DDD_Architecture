using System;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using System.Text;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Services;
using static Domain.Enums.SubscriptionEstatus;

namespace Domain.Entities
{
    public class Subscription
    {
        public int Id { get; private set; } = 0;
        public string Type { get; private set; }
        public Email UserMail { get; private set; }
        public decimal Price { get; private set; } = 0;
        public SubscriptionStatus Status { get; private set; }
        public decimal TotalPrice { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime? EndDate { get; private set; }

        private Subscription() { }

        public Subscription(string type, Email userMail, decimal price)
        {
            if (userMail == null)
                throw new DomainException("Email is required");
            if (string.IsNullOrWhiteSpace(type))
                throw new DomainException("Subscription type is required");
            if (price <= 0)
                throw new DomainException("Price must be greater than zero");

            Type = type.ToLower();
            UserMail = userMail;
            Price = price;
            Status = SubscriptionStatus.Active;
            StartDate = DateTime.UtcNow;

        }

        public void Cancel()
        {
            if (Status == SubscriptionStatus.Cancelled)
                throw new DomainException("Subscription is already cancelled");

            Status = SubscriptionStatus.Cancelled;
            EndDate = DateTime.UtcNow;
            TotalPrice = CalculateTotalPrice();
        }
        public void UpdatePrice(decimal newPrice)
        {
            if (newPrice <= 0)
                throw new DomainException("Price must be greater than zero");
            if (Status != SubscriptionStatus.Active)
                throw new DomainException("Cannot update price of an inactive subscription");

            Price = newPrice;
        }

        public int MonthsActive()
        {
            var end = EndDate ?? DateTime.UtcNow;
            var months = ((end.Year - StartDate.Year) * 12) + end.Month - StartDate.Month;
            if (end.Day < StartDate.Day) months--;
            return Math.Max(0, months);
        }
        public bool IsActive() => Status == SubscriptionStatus.Active;
        private decimal CalculateTotalPrice()
        {
            var months = MonthsActive();
            return Price * months;
        }
    }
}
