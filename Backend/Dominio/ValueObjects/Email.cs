using System;
using System.Collections.Generic;
using System.Text;
using Domain.Exceptions;

namespace Domain.ValueObjects
{
    public record Email
    {
        public string value { get;  }

        public Email(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new DomainException("Email is required");
            if (!value.Contains('@') || !value.Contains('.'))
                throw new DomainException("Invalid email format");
            if (value.Length > 254)
                throw new DomainException("Email exceeds the maximum allowed length");

            value = value.Trim().ToLowerInvariant();
            this.value = value;
        }

        public static implicit operator string(Email email) => email.value;
        public override string ToString() => value;

    }
}
