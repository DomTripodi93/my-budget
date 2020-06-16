﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

namespace backend2.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1");

            modelBuilder.Entity("backend.Models.Account", b =>
                {
                    b.Property<int>("userId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("AccountType")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Active")
                        .HasColumnType("INTEGER");

                    b.Property<float>("Balance")
                        .HasColumnType("REAL");

                    b.Property<bool>("IsBank")
                        .HasColumnType("INTEGER");

                    b.HasKey("userId", "Name");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("backend.Models.RecurringTransaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AccountFrom")
                        .HasColumnType("TEXT");

                    b.Property<string>("AccountTo")
                        .HasColumnType("TEXT");

                    b.Property<float>("Cost")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("LastDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("NextDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("RecurringInterval")
                        .HasColumnType("INTEGER");

                    b.Property<int>("userId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("userId");

                    b.ToTable("RecurringTransactions");
                });

            modelBuilder.Entity("backend.Models.Settings", b =>
                {
                    b.Property<int>("userId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("AccountPageSize")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsNew")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TransactionPageSize")
                        .HasColumnType("INTEGER");

                    b.HasKey("userId");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("backend.Models.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AccountFrom")
                        .HasColumnType("TEXT");

                    b.Property<string>("AccountTo")
                        .HasColumnType("TEXT");

                    b.Property<float>("Cost")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Note")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Reconciled")
                        .HasColumnType("INTEGER");

                    b.Property<int>("userId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("userId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("BLOB");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.Models.Account", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.RecurringTransaction", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Settings", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithOne("Settings")
                        .HasForeignKey("backend.Models.Settings", "userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Transaction", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
