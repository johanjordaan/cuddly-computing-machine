import cmath
import random
import math
import pygame as pg

white = 255, 240, 200
black = 20, 20, 40

# constants
WINSIZE = [640, 480]
WINCENTER = [320, 240]
NUMSTARS = 150

WIDTH = 100000      # LY
DEPTH = 2000        # LY


#class Galaxy:
#    def __init__(self):

class Star:
    def __init__(self):
        self.r = random.random()*(WIDTH/2)
        self.theta = random.random()*(math.pi*2)
        self.x = self.r * math.cos(self.theta)
        self.y = self.r * math.sin(self.theta)
        self.z = random.random()*(DEPTH/2)
        self.color = 255, 240, 200, 1

    def draw(self, surface):
        pos = (int(self.x / WINSIZE[0]*2)+WINCENTER[0], int(self.y / WINSIZE[0]*2)++WINCENTER[1])
        surface.set_at(pos, self.color)


def get_ellipse_point(cx,cy,a,b,alpha,theta):
    x = a * math.cos(alpha) * math.cos(theta) - b * math.sin(alpha) * math.sin(theta) + cx
    y = a * math.cos(alpha) * math.sin(theta) + b * math.sin(alpha) * math.cos(theta) + cy
    return x, y


def draw_ellipse(surface, x, y, a, b, tilt):
    for angle in range(360):
        x1,y1 = get_ellipse_point(x,y,a,b,math.radians(angle),math.radians(tilt))
        x2,y2 = get_ellipse_point(x,y,a,b,math.radians(angle+1),math.radians(tilt))

        surface.set_at((int(x1), int(y1)),(255, 240, 200, 1))
        #pg.draw.line(surface, (255, 240, 200, 50), (x1, y1), (x2, y2))

def draw_density_wave(surface,x,y,rmin,rmax,rstep,tilt_step):
    tilt = 0
    for i in range(1000):
        perc = 0.7
        for r in range(rmin,rmax,rstep):
            draw_ellipse(surface,x,y,r*perc,r,tilt)
            tilt += tilt_step
            perc+=0.00001


def main():
    random.seed()
    clock = pg.time.Clock()

    pg.init()
    pg.font.init()
    myfont = pg.font.SysFont('Courier New', 30)
    screen = pg.display.set_mode(WINSIZE)
    pg.display.set_caption("s t a r s")



    screen.fill(black)
    surface = pg.Surface(WINSIZE, pg.SRCALPHA)
    surface.fill((0, 0, 0, 0))

    count = 0
    done = 0
    while not done:
        screen.fill((0, 0, 0, 0))

        #draw_ellipse(surface, WINCENTER[0], WINCENTER[1], 100, 50, 45)
        #draw_ellipse(surface, WINCENTER[0], WINCENTER[1], 100, 50, 60)
        #draw_ellipse(surface, WINCENTER[0], WINCENTER[1], 100, 50, 25)
        draw_density_wave(surface,WINCENTER[0], WINCENTER[1], 10,300,10,5)
        screen.blit(surface, (0, 0))

        #textsurface = myfont.render(f'Count : {count/1000000}', False, white)
        #screen.blit(surface, (0, 0))
        #screen.blit(textsurface, (0, 0))
        #batch = 100
        #for i in range(batch):
        #    s = Star()
        #    s.draw(surface)
        #    count += batch

        pg.display.update()

        for e in pg.event.get():
            if e.type == pg.QUIT or (e.type == pg.KEYUP and e.key == pg.K_ESCAPE):
                done = 1
                break
        clock.tick(50)
    pg.quit()


if __name__ == "__main__":
    main()