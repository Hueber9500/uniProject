using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OOP2;

namespace SBDOOP
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var connection = @"Data Source=aa14fds26mtynnh.c9cc6g5jgktv.eu-central-1.rds.amazonaws.com,1433;Initial Catalog=StudentScheduler;Integrated Security=False;Persist Security Info=True;User ID=msscoretest;Password=msscoretest";

            services.AddDbContext<DbCtx>(options => options.UseSqlServer(connection));

            services.AddMvc();

            services.AddScoped<DbCtx>();
            services.AddScoped<Database>(provider => new Database(connection));

            services.AddCors(opt =>
            {
                opt.AddPolicy("uni", builder =>
                {
                    builder.AllowAnyOrigin();
                    builder.AllowAnyMethod();
                    builder.AllowAnyHeader();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("uni");

            app.UseMvc();   
        }
    }
}
