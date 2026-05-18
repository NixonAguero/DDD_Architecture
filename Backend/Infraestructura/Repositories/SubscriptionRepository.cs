using System;
using System.Collections.Generic;
using System.Text;
using Infraestructure.Persistence;

namespace Infraestructure.Repositories
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private readonly AppDbContext _context;

        public SubscriptionRepository(AppDbContext context)
            => _context = context;

        public async Task<Subscription?> GetByIdAsync(int id)
            => await _context.Subscriptions.FindAsync(id);

        public async Task<IEnumerable<Subscription>> GetAllAsync()
            => await _context.Subscriptions.ToListAsync();

        public async Task<IEnumerable<Subscription>> GetByUserEmailAsync(string email)
            => await _context.Subscriptions
                   .Where(s => s.UserMail.Value == email.Trim().ToLowerInvariant())
                   .ToListAsync();

        public async Task AddAsync(Subscription subscription)
        {
            await _context.Subscriptions.AddAsync(subscription);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Subscription subscription)
        {
            _context.Subscriptions.Update(subscription);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            if (subscription is null) return;

            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();
        }
    }
}
