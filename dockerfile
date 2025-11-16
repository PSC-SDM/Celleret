FROM node:24-alpine
WORKDIR /app    
COPY . /app
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["sh", "/app/entrypoint.sh"]
# CMD ["sleep", "infinity"]