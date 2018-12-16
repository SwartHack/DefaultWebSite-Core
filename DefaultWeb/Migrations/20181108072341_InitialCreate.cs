using Microsoft.EntityFrameworkCore.Migrations;

namespace DefaultWeb.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContentType",
                table: "DwsFileInfo",
                newName: "MimeType");

            migrationBuilder.AddColumn<string>(
                name: "SessionId",
                table: "Sources",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SessionId",
                table: "Comments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "Sources");

            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "MimeType",
                table: "DwsFileInfo",
                newName: "ContentType");
        }
    }
}
