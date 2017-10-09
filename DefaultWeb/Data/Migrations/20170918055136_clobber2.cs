using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DefaultWeb.Migrations
{
    public partial class clobber2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_DwsFileInfos",
                table: "DwsFileInfos");

            migrationBuilder.RenameTable(
                name: "DwsFileInfos",
                newName: "DwsFileInfo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DwsFileInfo",
                table: "DwsFileInfo",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_DwsFileInfo",
                table: "DwsFileInfo");

            migrationBuilder.RenameTable(
                name: "DwsFileInfo",
                newName: "DwsFileInfos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DwsFileInfos",
                table: "DwsFileInfos",
                column: "Id");
        }
    }
}
