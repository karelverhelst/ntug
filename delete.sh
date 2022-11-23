sudo umount /mnt/web
sudo umount /mnt/mariadb
kubectl delete all --all -n ntug
kubectl delete pvc --all -n ntug
cd /home
sudo rm -R /mnt/web
sudo rm -R /mnt/mariadb
sudo rm -R /home/user/ntug
