using BLLs;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace WebBackend.Providers
{
    public class LibAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        #pragma warning disable CS1998
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        #pragma warning restore CS1998
        {
            context.Validated();
        }


        #pragma warning disable CS1998
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        #pragma warning restore CS1998
        {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            UserBLL bll = new UserBLL();
            var userPassword = bll.GetPasswordUserAdmin(context.UserName); 

            if (string.IsNullOrEmpty(userPassword))
            {
                context.SetError("invalid_grant", "The username is incorrect.");
                return;
            }

            PasswordHasher hasher = new PasswordHasher();
            if(hasher.VerifyHashedPassword(userPassword, context.Password) == PasswordVerificationResult.Success)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                var user = bll.GetUserByUserName(context.UserName);

                identity.AddClaim(new Claim("UserName", user.UserName));
                identity.AddClaim(new Claim("UserId", user.UserID.ToString()));

                var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    { "UserName", context.UserName},
                    { "UserId", user.UserID.ToString()}
                });

                var ticket = new AuthenticationTicket(identity, props);
                context.Validated(ticket);
            }
            else
            {
                context.SetError("invalid_grant", "The password is incorrect.");
                return;
            }
        }

    }
}