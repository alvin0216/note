const { execSync } = require("child_process");

function executeGitPush() {
  const now = formatDateTime();

  try {
    // 根据操作系统选择命令格式
    const isWindows = process.platform === "win32";
    const command = isWindows
      ? `git add . && git commit -m "Updated at ${now}" && git push`
      : `git add .; git commit -m "Updated at ${now}"; git push`;

    execSync(command, {
      stdio: "inherit",
      shell: isWindows ? process.env.ComSpec : "/bin/bash",
    });

    console.log(`\nSUCCESS: Pushed changes at ${now}`);
  } catch (error) {
    console.error("\nERROR: Push failed. Possible reasons:");
    console.error("- No changes to commit");
    console.error("- Network issues");
    console.error("- Authentication problems");
    process.exit(1);
  }
}

function formatDateTime(format = "YYYY-MM-DD HH:mm:ss") {
  const pad = (n, len) => String(n).padStart(len, "0");
  const date = new Date();

  return format
    .replace(/YYYY/g, pad(date.getFullYear(), 4))
    .replace(/MM/g, pad(date.getMonth() + 1, 2))
    .replace(/DD/g, pad(date.getDate(), 2))
    .replace(/HH/g, pad(date.getHours(), 2))
    .replace(/mm/g, pad(date.getMinutes(), 2))
    .replace(/ss/g, pad(date.getSeconds(), 2));
}

// 执行主函数
executeGitPush();
