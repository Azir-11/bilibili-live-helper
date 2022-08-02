#!/bin/bash

echo "当前的分支: $VERCEL_GIT_COMMIT_REF"
echo "提交说明：$VERCEL_GIT_COMMIT_MESSAGE"

# 只有是 master 分支，且 commit message 的 scope 为 docs 时，才会触发部署
if [[ "$VERCEL_GIT_COMMIT_REF" == "master" && "$VERCEL_GIT_COMMIT_MESSAGE" =~ "(docs)" ]] 
then
  # Proceed with the build
    echo "✅ - 继续部署"
  exit 1;

else
  # Don't build
  echo "🛑 - 停止部署"
  exit 0;
fi