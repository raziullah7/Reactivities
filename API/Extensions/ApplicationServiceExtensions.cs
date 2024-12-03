﻿using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        services.AddOpenApi();
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });

        // adding CORS Service
        services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", policy => 
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));
        });

        // adding MediatR
        services.AddMediatR(
            cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly)
        );

        // adding AutoMapper
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);

        return services;
    }
}