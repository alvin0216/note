import subprocess
import sys


def git_commit_push(commit_message="Auto commit"):
    """
    快速执行 git add, commit, push
    """
    try:
        # git add .
        subprocess.run(["git", "add", "."], check=True)
        print("✓ 已添加所有文件")

        # git commit
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        print(f"✓ 已提交：{commit_message}")

        # git push
        result = subprocess.run(["git", "push"], capture_output=True, text=True)

        if result.returncode == 0:
            print("✓ 推送成功")
        else:
            # 如果当前分支没有设置上游分支，尝试设置并推送
            if "no upstream branch" in result.stderr:
                # 获取当前分支名
                branch_result = subprocess.run(
                    ["git", "branch", "--show-current"], capture_output=True, text=True
                )
                branch_name = branch_result.stdout.strip()

                # 设置上游分支并推送
                subprocess.run(
                    ["git", "push", "--set-upstream", "origin", branch_name], check=True
                )
                print(f"✓ 已设置上游分支并推送：origin/{branch_name}")
            else:
                print(f"推送失败：{result.stderr}")
                return False

        return True

    except subprocess.CalledProcessError as e:
        print(f"❌ 操作失败：{e}")
        return False


# 使用示例
if __name__ == "__main__":
    # 使用默认提交信息
    git_commit_push()

    # 或指定提交信息
    # git_commit_push("修复了xxx问题")

    # 或从命令行参数获取提交信息
    # if len(sys.argv) > 1:
    #     git_commit_push(sys.argv[1])
    # else:
    #     git_commit_push()
