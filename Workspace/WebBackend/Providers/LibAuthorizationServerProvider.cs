using BLLs;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace WebBackend.Providers {
    public class LibAuthorizationServerProvider : OAuthAuthorizationServerProvider {
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
            string[] roleIDMangements = ConfigurationManager.AppSettings["RoleIDMangement"].Split(';');
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            UserBLL bll = new UserBLL();
            var userPassword = bll.GetPasswordUserAdmin(context.UserName);

            if (userPassword == null) {
                context.SetError("invalid_grant", "Tên đăng nhập không hợp lệ.");
                return;
            } else {
                if (userPassword.StatusTypeID != 4) {
                    context.SetError("invalid_grant", "Tài khoản của bạn đang không hoạt động. Hãy liên lạc với ban quản lý!");
                    return;
                } else {
                    if (!Array.Exists(roleIDMangements, role => role.Equals(userPassword.RoleID.ToString()))) {
                        context.SetError("invalid_grant", "Bạn không có quyền để truy cập trang này!");
                        return;
                    } else {
                        PasswordHasher hasher = new PasswordHasher();
                        if (hasher.VerifyHashedPassword(userPassword.PasswordHash, context.Password) == PasswordVerificationResult.Success) {
                            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                            var user = bll.GetUserByUserName(context.UserName);


                            // update last logint
                            bll.UpdateLastLogin(user.UserID);

                            identity.AddClaim(new Claim("UserName", user.UserName));
                            identity.AddClaim(new Claim("UserId", user.UserID.ToString()));
                            identity.AddClaim(new Claim("RoleID", user.RoleID.ToString()));

                            var props = new AuthenticationProperties(new Dictionary<string, string> {
                                { "UserName", context.UserName},
                                { "UserId", user.UserID.ToString()},
                                { "RoleID", user.RoleID.ToString() }
                            });

                            var ticket = new AuthenticationTicket(identity, props);
                            context.Validated(ticket);
                        } else {
                            context.SetError("invalid_grant", "Mật khẩu không hợp lệ.");
                            return;
                        }
                    }
                }
            }

        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context) {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary) {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

    }
}